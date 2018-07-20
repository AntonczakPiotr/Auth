using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auth.Models;
using AutoMapper;
using DataAccessLibrary.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Database;

namespace Auth.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountsController : Controller
    {
        private readonly DatabaseModel _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<AppUser> userManager, IMapper mapper, DatabaseModel appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded)
            {
                foreach (var e in result.Errors)
                {
                    ModelState.TryAddModelError(e.Code, e.Description);
                }
                
                return new BadRequestObjectResult(ModelState);
            }

            return new OkObjectResult("Account created");
        }
    }
}