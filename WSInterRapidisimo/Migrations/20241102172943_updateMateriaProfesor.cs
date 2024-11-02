using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WSInterRapidisimo.Migrations
{
    /// <inheritdoc />
    public partial class updateMateriaProfesor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProfesorId",
                table: "Profesores",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Profesores",
                newName: "ProfesorId");
        }
    }
}
