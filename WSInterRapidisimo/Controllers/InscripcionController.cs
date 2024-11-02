using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WSInterRapidisimo.Data;
using WSInterRapidisimo.Models;

namespace WSInterRapidisimo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InscripcionController : ControllerBase
    {
        private readonly context _context;
        public InscripcionController(context context)
        {
            _context = context;
        }

        // GET: api/Inscripciones
        [HttpGet]
        public ActionResult<IEnumerable<Inscripcion>> GetInscripciones()
        {
            return _context.Inscripcion.ToList();
        }

        // GET: api/Inscripciones/5
        [HttpGet("{id}")]
        public ActionResult<Inscripcion> GetInscripcion(int id)
        {
            var inscripcion = _context.Inscripcion.Find(id);

            if (inscripcion == null)
            {
                return NotFound();
            }

            return inscripcion;
        }

        // POST: api/Inscripciones
        [HttpPost]
        public ActionResult<Inscripcion> CreateInscripcion(Inscripcion inscripcion)
        {
            // Verificar si el estudiante ya tiene 3 materias inscritas
            var inscripcionesEstudiante = _context.Inscripcion
                .Where(i => i.EstudianteId == inscripcion.EstudianteId)
                .ToList();

            if (inscripcionesEstudiante.Count >= 3)
            {
                return BadRequest("El estudiante ya tiene el límite de 3 materias inscritas.");
            }

            // Verificar si el estudiante ya tiene una materia con el mismo profesor
            if (inscripcionesEstudiante.Any(i => i.ProfesorId == inscripcion.ProfesorId))
            {
                return BadRequest("El estudiante ya tiene una materia con este profesor.");
            }

            // Validar que la materia exista y que el profesor esté asignado a la materia
            var materia = _context.Materias.Find(inscripcion.MateriaId);
            if (materia == null || materia.ProfesorId != inscripcion.ProfesorId)
            {
                return BadRequest("Materia o profesor inválido para la inscripción.");
            }

            _context.Inscripcion.Add(inscripcion);
            _context.SaveChanges();

            return CreatedAtAction("GetInscripcion", new { id = inscripcion.Id }, inscripcion);
        }

        // PUT: api/Inscripciones/5
        [HttpPut("{id}")]
        public IActionResult UpdateInscripcion(int id, Inscripcion inscripcion)
        {
            if (id != inscripcion.Id)
            {
                return BadRequest();
            }

            var existingInscripcion = _context.Inscripcion.Find(id);
            if (existingInscripcion == null)
            {
                return NotFound();
            }

            existingInscripcion.EstudianteId = inscripcion.EstudianteId;
            existingInscripcion.MateriaId = inscripcion.MateriaId;
            existingInscripcion.ProfesorId = inscripcion.ProfesorId;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Inscripciones/5
        [HttpDelete("{id}")]
        public IActionResult DeleteInscripcion(int id)
        {
            var inscripcion = _context.Inscripcion.Find(id);
            if (inscripcion == null)
            {
                return NotFound();
            }

            _context.Inscripcion.Remove(inscripcion);
            _context.SaveChanges();

            return NoContent();
        }

        // GET: api/Inscripciones/EstudiantesCompartidos/5
        // Método para ver los estudiantes en la misma materia
        [HttpGet("EstudiantesCompartidos/{materiaId}")]
        public ActionResult<IEnumerable<string>> GetEstudiantesCompartidos(int materiaId)
        {
            var estudiantes = _context.Inscripcion
                .Where(i => i.MateriaId == materiaId)
                .Select(i => i.EstudianteId)
                .Distinct()
                .ToList();

            var nombresEstudiantes = _context.Estudiantes
                .Where(e => estudiantes.Contains(e.Id))
                .Select(e => e.Nombre)
                .ToList();

            return nombresEstudiantes;
        }
    }
}
