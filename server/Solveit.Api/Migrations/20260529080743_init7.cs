using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Solveit.Api.Migrations
{
    /// <inheritdoc />
    public partial class init7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_AppUsers_UserId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Applications");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Services",
                newName: "ProviderId");

            migrationBuilder.RenameIndex(
                name: "IX_Services_UserId",
                table: "Services",
                newName: "IX_Services_ProviderId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Applications",
                newName: "ProviderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_AppUsers_ProviderId",
                table: "Services",
                column: "ProviderId",
                principalTable: "AppUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_AppUsers_ProviderId",
                table: "Services");

            migrationBuilder.RenameColumn(
                name: "ProviderId",
                table: "Services",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Services_ProviderId",
                table: "Services",
                newName: "IX_Services_UserId");

            migrationBuilder.RenameColumn(
                name: "ProviderId",
                table: "Applications",
                newName: "UserId");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_AppUsers_UserId",
                table: "Services",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "Id");
        }
    }
}
