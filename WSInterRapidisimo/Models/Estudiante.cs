using System.ComponentModel.DataAnnotations;

namespace WSInterRapidisimo.Models
{
    public class Estudiante
    {
        [Key]
        [Display(Name = "Id Estudiante")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Nombre Estudiante es Obligatorio")]
        [Display(Name = "Nombre Estudiante")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Apellidos Estudiante es Obligatorio")]
        [Display(Name = "Apellidos Estudiante")]
        public string Apellidos { get; set; }
    }
}
