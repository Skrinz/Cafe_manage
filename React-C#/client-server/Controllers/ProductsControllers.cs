using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using client_server.Context;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    // GET: api/products
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    // POST: api/products
    [HttpPost]
    public async Task<IActionResult> AddProduct([FromBody] Products newProduct)
    {
        if (newProduct == null)
        {
            return BadRequest("Product data is required.");
        }

        try
        {
            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllProducts), new { newProduct.Id }, newProduct);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while adding the product.", error = ex.Message });
        }
    }

    // DELETE: api/products/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound("Product not found.");
        }

        try
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while deleting the product.", error = ex.Message });
        }
    }

    // PATCH: api/products/{id}
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Products updatedProduct)
    {
        if (updatedProduct == null)
        {
            return BadRequest("Product data is required.");
        }

        var existingProduct = await _context.Products.FindAsync(id);

        if (existingProduct == null)
        {
            return NotFound("Product not found.");
        }

        try
        {
            existingProduct.Product_name = updatedProduct.Product_name;
            existingProduct.Product_price = updatedProduct.Product_price;
            existingProduct.Product_quantity = updatedProduct.Product_quantity;

            _context.Entry(existingProduct).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(existingProduct);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while updating the product.", error = ex.Message });
        }
    }
}
