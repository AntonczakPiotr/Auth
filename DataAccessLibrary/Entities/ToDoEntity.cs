using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLibrary.Entities;

namespace Server.Database
{
    public class ToDoEntity
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public DateTime TimeStamp { get; set; }
        public bool Completed { get; set; }
        public string IdentityId { get; set; }
        public virtual AppUser Identity { get; set; }  // navigation property
    }
}
