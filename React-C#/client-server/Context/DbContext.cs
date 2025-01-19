using Microsoft.EntityFrameworkCore;

namespace client_server.Context{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Products> Products { get; set; } = null!;
        public DbSet<Transactions> Transactions { get; set; } = null!;
    }

    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }

    public class UserLoginDto
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
    public class Products{
        public int Id { get; set; }
        public required string Product_name { get; set; }
        public required int Product_quantity { get; set; }
        public required double Product_price { get; set; }
    }

    public class Transactions{
        public int Id { get; set; }
        public required double Total_price { get; set; }

        public required DateTime Transaction_date { get; set; }
   
    }

    public class TransactionsRequest
{
    public double TotalPrice { get; set; }
    public DateTime TransactionDate { get; set; }
    public List<CartItem>? Cart { get; set; }
}

public class CartItem
{
        public int Id { get; set; }
        public int Quantity { get; set; }
}
}