using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Solveit.Api.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "UserFiles");

            migrationBuilder.DropColumn(
                name: "OwnerType",
                table: "UserFiles");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "ServiceFiles");

            migrationBuilder.DropColumn(
                name: "OwnerType",
                table: "ServiceFiles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "UserFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OwnerType",
                table: "UserFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "ServiceFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OwnerType",
                table: "ServiceFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
