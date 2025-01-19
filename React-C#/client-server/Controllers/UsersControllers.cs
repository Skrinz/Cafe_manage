using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using client_server.Context;

[ApiController]
[Route("api/[controller]")]
public class UsersController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    // GET: api/users
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    // POST: api/users/
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User newUser)
    {
        if (newUser == null)
        {
            return BadRequest("User data is required.");
        }

        if (string.IsNullOrEmpty(newUser.Username) || string.IsNullOrEmpty(newUser.Password))
        {
            return BadRequest("Username and password are required.");
        }

        try
        {
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllUsers), new { newUser.Id }, newUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while creating the user.", error = ex.Message });
        }
    }

    // POST: api/users/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto loginUser)
    {
        if (loginUser == null || string.IsNullOrEmpty(loginUser.Username) || string.IsNullOrEmpty(loginUser.Password))
        {
            return BadRequest("Username and password are required.");
        }

        // Authenticate the user by checking only the username and password
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == loginUser.Username && u.Password == loginUser.Password);

        if (user == null)
        {
            return Unauthorized("Invalid credentials.");
        }

        // Return success response without Role
        return Ok(new { message = "Login successful", user.Role, user.Id});
    }


    // DELETE: api/users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        try
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while deleting the user.", error = ex.Message });
        }
    }

    // PATCH: api/users/{id}
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser){
        if (updatedUser == null){
            return BadRequest("User data is required.");
        }

        var existingUser = await _context.Users.FindAsync(id);

        if (existingUser == null){
            return NotFound("User not found.");
        }

        try{
            existingUser.Username = updatedUser.Username;
            existingUser.Password = updatedUser.Password;
            existingUser.Role = updatedUser.Role;

            _context.Entry(existingUser).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(existingUser);
        }catch (Exception ex){
            return StatusCode(500, new { message = "An error occurred while updating the user.", error = ex.Message });
        }
    }
}
