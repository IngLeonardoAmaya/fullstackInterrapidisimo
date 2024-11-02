using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WSInterRapidisimo.Data;
using WSInterRapidisimo.Models;

namespace WSInterRapidisimo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController : ControllerBase
    {
        private readonly context _context;

        public EstudiantesController(context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetEstudiantes()
        {
            return Ok(await _context.Estudiantes.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEstudianteById(int id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null)
                return NotFound("Estudiante no encontrado.");

            return Ok(estudiante);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEstudiante([FromBody] Estudiante estudiante)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Estudiantes.Add(estudiante);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEstudiantes), new { id = estudiante.Id }, estudiante);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEstudiante(int id, [FromBody] Estudiante estudiante)
        {
            if (id != estudiante.Id)
                return BadRequest("ID del estudiante no coincide.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Entry(estudiante).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstudiante(int id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null)
                return NotFound("Estudiante no encontrado.");

            _context.Estudiantes.Remove(estudiante);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
