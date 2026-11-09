using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using taskmateAPI.Data;
using taskmateAPI.Models;
using taskmateAPI.Models.DTO;

namespace taskmateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskMateController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TaskMateController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _applicationDbContext.TaskMate
                .Select(x=>new TaskMateResponseDTO
                {
                    Id = x.Id,
                    Name = x.Name,
                    Created = x.Created
                })
                .ToListAsync();
            return Ok(tasks);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _applicationDbContext.TaskMate.FindAsync(id);

            if (task == null)
                return NotFound();

            var result = new TaskMateResponseDTO
            {
                Id = task.Id,
                Name = task.Name,
                Created = task.Created
            };

            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskMateCreateDTO taskMateCreateDTO)
        {
            var task = new TaskMate
            {
                Name = taskMateCreateDTO.Name,
                Created = DateTime.UtcNow
            };
            await _applicationDbContext.TaskMate.AddAsync(task);
            await _applicationDbContext.SaveChangesAsync();
            var result=new TaskMateResponseDTO
            {
                Id = task.Id,
                Name = task.Name,
                Created = task.Created
            };
            return CreatedAtAction(
       nameof(GetTask),
       new { id = task.Id },
       result
   );
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id,TaskMateUpdateDTO taskMateUpdateDTO)

        {
            var task= await _applicationDbContext.TaskMate.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.Name = taskMateUpdateDTO.Name;
            task.Created = DateTime.UtcNow;
            
             await _applicationDbContext.SaveChangesAsync();
            var result = new TaskMateResponseDTO
            {
                Id = task.Id,
                Name = task.Name,
                Created = task.Created
            };
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _applicationDbContext.TaskMate.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            _applicationDbContext.Remove(task);
            await _applicationDbContext.SaveChangesAsync();
            return NoContent();
        }


    }
}
