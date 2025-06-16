using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vis.Migrations
{
    /// <inheritdoc />
    public partial class three : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PolicyProposals_BasePremiumPlans_BasePremiumId",
                table: "PolicyProposals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BasePremiumPlans",
                table: "BasePremiumPlans");

            migrationBuilder.RenameTable(
                name: "BasePremiumPlans",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PolicyProposals_BasePremium_BasePremiumId",
                table: "PolicyProposals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BasePremium",
                table: "BasePremium");

            migrationBuilder.RenameTable(
                name: "BasePremium",
                newName: "BasePremiumPlans");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BasePremiumPlans",
                table: "BasePremiumPlans",
                column: "BasePremiumId");

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyProposals_BasePremiumPlans_BasePremiumId",
                table: "PolicyProposals",
                column: "BasePremiumId",
                principalTable: "BasePremiumPlans",
                principalColumn: "BasePremiumId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
