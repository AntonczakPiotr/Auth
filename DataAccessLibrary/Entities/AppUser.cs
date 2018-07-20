using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLibrary.Entities
{
    public class AppUser : IdentityUser
    {
        public AppUser()
        {
            
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
