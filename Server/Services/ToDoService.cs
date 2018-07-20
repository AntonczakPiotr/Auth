using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Database;
using Server.Models;

namespace Server.Services
{
    public class ToDoService
    {
        private DatabaseModel _db;
        private IMapper _mapper;

        public ToDoService(DatabaseModel db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ToDoItem>> GetAllToDos(string userId)
        {
            var toDoItems = _db.ToDos.Include(i => i.Identity).Where(c => c.Identity.Id == userId).Select(_ => new ToDoItem() { Header = _.Header, Completed = _.Completed, Id = _.Id });
            return toDoItems;
        }

        public async Task<ToDoItem> GetToDo(string userId, int toDoId)
        {
            var toDoItem = await _db.ToDos.Include(i => i.Identity).Where(c => c.Identity.Id == userId).SingleAsync(_ => _.Id == toDoId);
            return _mapper.Map<ToDoItem>(toDoItem);
        }

        public async Task<ToDoItem> InsertNewToDoItem(string userId, ToDoItem toDo)
        {
            ToDoEntity entity = _mapper.Map<ToDoEntity>(toDo);
            entity.IdentityId = userId;
            entity.TimeStamp = DateTime.Now;
            _db.ToDos.Add(entity);
            int numberOfChanges = await _db.SaveChangesAsync();
            return _mapper.Map<ToDoItem>(entity);
        }

        public async Task<bool> UpdateToDoItem(string userId, int toDoId, ToDoItem toDo)
        {
            var toDoEntity = await _db.ToDos.Include(i => i.Identity).Where(c => c.Identity.Id == userId).SingleAsync(_ => _.Id == toDoId);
            toDoEntity.Completed = toDo.Completed;
            toDoEntity.Description = toDo.Description;
            toDoEntity.Header = toDo.Header;
            toDoEntity.TimeStamp = DateTime.Now;
            _db.ToDos.Update(toDoEntity);
            int numberOfChanges = await _db.SaveChangesAsync();
            return numberOfChanges == 1;
        }

        public async Task<bool> DeleteToDoItem(string userId, int toDoId)
        {
            var toDoEntity = await _db.ToDos.Include(i => i.Identity).Where(c => c.Identity.Id == userId).SingleAsync(_ => _.Id == toDoId);
            _db.ToDos.Remove(toDoEntity);
            int numberOfChanges = await _db.SaveChangesAsync();
            return numberOfChanges == 1;
        }
    }
}