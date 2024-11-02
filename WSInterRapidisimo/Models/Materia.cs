using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WSInterRapidisimo.Models
{
    public class Materia
    {
        [Key]
        [Display(Name = "Id Materia")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Nombre Materia es Obligatorio")]
        [Display(Name = "Nombre Materia")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Creditos Materia es Obligatorio")]
        [Display(Name = "Creditos Materia")]
        public int Creditos { get; set; } = 3;

        [Required(ErrorMessage = "El campo ProfesorId es obligatorio.")]
        [ForeignKey("Profesor")]
        public int ProfesorId { get; set; }

    }
}
