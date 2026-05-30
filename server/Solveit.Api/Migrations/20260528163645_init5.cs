using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Solveit.Api.Migrations
{
    /// <inheritdoc />
    public partial class init5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "MaxPrice",
                table: "Applications",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "MinPrice",
                table: "Applications",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "OrderStatus",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Pricing",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubcategoryId",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "MaxPrice",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "MinPrice",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "OrderStatus",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "Pricing",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "SubcategoryId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Applications");
        }
    }
}
