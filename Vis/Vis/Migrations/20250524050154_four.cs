using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vis.Migrations
{
    /// <inheritdoc />
    public partial class four : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PolicyProposals_BasePremium_BasePremiumId",
                table: "PolicyProposals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BasePremium",
                table: "BasePremium");

            migrationBuilder.RenameTable(
                name: "BasePremium",
                newName: "BasePremiums");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BasePremiums",
                table: "BasePremiums",
                column: "BasePremiumId");

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyProposals_BasePremiums_BasePremiumId",
                table: "PolicyProposals",
                column: "BasePremiumId",
                principalTable: "BasePremiums",
                principalColumn: "BasePremiumId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PolicyProposals_BasePremiums_BasePremiumId",
                table: "PolicyProposals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BasePremiums",
                table: "BasePremiums");

            migrationBuilder.RenameTable(
                name: "BasePremiums",
                newName: "BasePremium");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BasePremium",
                table: "BasePremium",
                column: "BasePremiumId");

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyProposals_BasePremium_BasePremiumId",
                table: "PolicyProposals",
                column: "BasePremiumId",
                principalTable: "BasePremium",
                principalColumn: "BasePremiumId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
