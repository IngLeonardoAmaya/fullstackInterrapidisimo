using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WSInterRapidisimo.Migrations
{
    /// <inheritdoc />
    public partial class NombreDeLaMigracion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materias_Profesores_ProfesorId",
                table: "Materias");

            migrationBuilder.AddForeignKey(
                name: "FK_Materias_Profesores_ProfesorId",
                table: "Materias",
                column: "ProfesorId",
                principalTable: "Profesores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materias_Profesores_ProfesorId",
                table: "Materias");

            migrationBuilder.AddForeignKey(
                name: "FK_Materias_Profesores_ProfesorId",
                table: "Materias",
                column: "ProfesorId",
                principalTable: "Profesores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
