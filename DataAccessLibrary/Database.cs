using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLibrary.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Server.Database
{
    public class DatabaseModel : IdentityDbContext<AppUser>
    {
        public DatabaseModel(DbContextOptions options) : base(options)
        {
        }

        protected DatabaseModel()
        {
        }

        public virtual DbSet<ToDoEntity> ToDos { get; set; }
    }
}
