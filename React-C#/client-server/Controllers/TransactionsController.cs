using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using client_server.Context;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    // GET: api/transactions
    [HttpGet]
    public async Task<IActionResult> GetAllTransactions()
    {
        var transactions = await _context.Transactions.ToListAsync();
        return Ok(transactions);
    }

    // POST: api/transactions
[HttpPost]
public async Task<IActionResult> AddTransactions([FromBody] TransactionsRequest request)
{
    if (request == null || request.Cart == null || !request.Cart.Any())
    {
        return BadRequest("Transaction data and cart items are required.");
    }

    try
    {
        // Create a new transaction
        var newTransaction = new Transactions
        {
            Total_price = request.TotalPrice,
            Transaction_date = request.TransactionDate
        };

        // Add transaction to the database
        await _context.Transactions.AddAsync(newTransaction);

        // Update product quantities based on the cart
        foreach (var item in request.Cart)
        {
            var product = await _context.Products.FindAsync(item.Id);
            if (product == null)
            {
                return NotFound(new { message = $"Product with ID {item.Id} not found." });
            }

            if (product.Product_quantity< item.Quantity)
            {
                return BadRequest(new { message = $"Not enough stock for product ID {item.Id}." });
            }

            // Reduce the product quantity
            product.Product_quantity -= item.Quantity;
            _context.Products.Update(product);
        }

        // Save changes
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAllTransactions), new { newTransaction.Id }, newTransaction);
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = "An error occurred while adding the transaction.", error = ex.Message });
    }
}


}
