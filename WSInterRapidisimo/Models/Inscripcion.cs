using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace WSInterRapidisimo.Models
{
    public class Inscripcion
    {
        [Key]
        [Display(Name = "Id Inscripción")]
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo EstudianteId es obligatorio.")]
        [ForeignKey("Estudiante")]
        public int EstudianteId { get; set; }

        [Required(ErrorMessage = "El campo MateriaId es obligatorio.")]
        [ForeignKey("Materia")]
        public int MateriaId { get; set; }

        [Required(ErrorMessage = "El campo ProfesorId es obligatorio.")]
        [ForeignKey("Profesor")]
        public int ProfesorId { get; set; }
    }
}
