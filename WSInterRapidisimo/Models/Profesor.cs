using System.ComponentModel.DataAnnotations;

namespace WSInterRapidisimo.Models
{
    public class Profesor
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Display(Name = "Nombre Profesor")]
        [Required(ErrorMessage = "Nombre Profesor es Obligatorio")]
        public string Nombre { get; set; }
    }
}
