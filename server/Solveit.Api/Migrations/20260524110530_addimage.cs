using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Solveit.Api.Migrations
{
    /// <inheritdoc />
    public partial class addimage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Subcategories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Subcategories");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Categories");
        }
    }
}
