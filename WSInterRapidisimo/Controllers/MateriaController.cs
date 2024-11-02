using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WSInterRapidisimo.Data;
using WSInterRapidisimo.Models;

namespace WSInterRapidisimo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MateriaController : ControllerBase
    {
        private readonly context _context;

        public MateriaController(context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMaterias()
        {
            return Ok(await _context.Materias.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMateria(int id)
        {
            var materia = await _context.Materias.FindAsync(id);
            if (materia == null)
                return NotFound("Materia no encontrada.");

            return Ok(materia);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMateria([FromBody] Materia materia)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validación del profesor
            var profesor = await _context.Profesores.FindAsync(materia.ProfesorId);
            if (profesor == null)
                return NotFound("Profesor no encontrado.");

            _context.Materias.Add(materia);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMateria), new { id = materia.Id }, materia);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMateria(int id, [FromBody] Materia materia)
        {
            if (id != materia.Id)
                return BadRequest("ID de la materia no coincide.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Entry(materia).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMateria(int id)
        {
            var materia = await _context.Materias.FindAsync(id);
            if (materia == null)
                return NotFound("Materia no encontrada.");

            _context.Materias.Remove(materia);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
