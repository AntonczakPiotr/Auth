using System;

namespace Server.Models
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string TimeStamp { get; set; }
        public bool Completed { get; set; }
        public int UserId { get; set; }
    }
}