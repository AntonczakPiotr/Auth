using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auth.Models;
using AutoMapper;
using DataAccessLibrary.Entities;
using Server.Database;

namespace Server.Setup
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<RegistrationModel, AppUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}
