using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Produces("application/json")]
    [Authorize]
    [Route("api/[controller]")]
    public class ToDoController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly ToDoService _toDoService;

        public ToDoController(ToDoService toDoService, IHttpContextAccessor httpContextAccessor)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _toDoService = toDoService;
        }

        // GET api/values
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ToDoItem>), 200)]
        public async Task<IActionResult> Get()
        {
            var userId = _caller.Claims.Single(c => c.Type == "id");
            IEnumerable<ToDoItem> items = await _toDoService.GetAllToDos(userId.Value);
            return Ok(items);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ToDoItem), 200)]
        public async Task<IActionResult> Get(int id)
        {
            var userId = _caller.Claims.Single(c => c.Type == "id");
            ToDoItem item = await _toDoService.GetToDo(userId.Value, id);
            return Ok(item);
        }

        // POST api/values
        [HttpPost]    
        [ProducesResponseType(typeof(ToDoItem), 200)]
        public async Task<IActionResult> Post([FromBody]ToDoItem value)
        {
            var userId = _caller.Claims.Single(c => c.Type == "id");
            var item = await _toDoService.InsertNewToDoItem(userId.Value, value);
            return Ok(item);
        }

        // PUT api/values      
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> Put(int id, [FromBody]ToDoItem value)
        {
            var userId = _caller.Claims.Single(c => c.Type == "id");
            bool success = await _toDoService.UpdateToDoItem(userId.Value, id, value);
            return Ok(success);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = _caller.Claims.Single(c => c.Type == "id");
            bool success = await _toDoService.DeleteToDoItem(userId.Value, id);
            return Ok(success);
        }
    }
}
