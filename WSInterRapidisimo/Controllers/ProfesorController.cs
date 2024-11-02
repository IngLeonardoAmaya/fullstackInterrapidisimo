using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WSInterRapidisimo.Data;
using WSInterRapidisimo.Models;

namespace WSInterRapidisimo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesorController : ControllerBase
    {
        private readonly context _context;

        public ProfesorController(context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfesores()
        {
            return Ok(await _context.Profesores.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfesor(int id)
        {
            var profesor = await _context.Profesores.FindAsync(id);
            if (profesor == null)
                return NotFound("Profesor no encontrado.");

            return Ok(profesor);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProfesor([FromBody] Profesor profesor)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Profesores.Add(profesor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProfesor), new { id = profesor.Id }, profesor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfesor(int id, [FromBody] Profesor profesor)
        {
            if (id != profesor.Id)
                return BadRequest("ID del profesor no coincide.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Entry(profesor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfesor(int id)
        {
            var profesor = await _context.Profesores.FindAsync(id);
            if (profesor == null)
                return NotFound("Profesor no encontrado.");

            _context.Profesores.Remove(profesor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
