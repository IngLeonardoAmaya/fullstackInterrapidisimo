using Microsoft.EntityFrameworkCore;
using WSInterRapidisimo.Models;

namespace WSInterRapidisimo.Data
{
    public class context : DbContext
    {
        public context(DbContextOptions<context> options):base(options){}

        public DbSet<Estudiante> Estudiantes { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<Profesor> Profesores { get; set; }
        public DbSet<Inscripcion> Inscripcion { get; set; }

    }
}
