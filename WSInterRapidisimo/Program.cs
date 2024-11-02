using Microsoft.EntityFrameworkCore;
using WSInterRapidisimo.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Configuraci�n de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin() // Cambia la URL si tu aplicaci�n Angular est� en otro dominio
              .AllowAnyMethod()  // Permitir todos los m�todos (GET, POST, PUT, DELETE)
              .AllowAnyHeader(); // Permitir todos los encabezados
        });
});


builder.Services.AddControllers();

//configuracion base de datos
builder.Services.AddDbContext<context>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConexionSql")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
