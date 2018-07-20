using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.Database;
using Server.Models;

namespace Server.Setup
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<ToDoItem, ToDoEntity>().ReverseMap();
        }
    }
}
