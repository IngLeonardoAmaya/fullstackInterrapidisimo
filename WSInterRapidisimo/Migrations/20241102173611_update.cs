using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WSInterRapidisimo.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materias_Profesores_ProfesorId",
                table: "Materias");

            migrationBuilder.DropIndex(
                name: "IX_Materias_ProfesorId",
                table: "Materias");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Materias_ProfesorId",
                table: "Materias",
                column: "ProfesorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materias_Profesores_ProfesorId",
                table: "Materias",
                column: "ProfesorId",
                principalTable: "Profesores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
