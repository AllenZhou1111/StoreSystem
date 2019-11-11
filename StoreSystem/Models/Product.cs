using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StoreSystem.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
