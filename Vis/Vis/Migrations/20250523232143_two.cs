using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vis.Migrations
{
    /// <inheritdoc />
    public partial class two : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PolicyProposals_BasePremiumPlans_BasePremiumPlanBasePremiumId",
                table: "PolicyProposals");

            migrationBuilder.DropIndex(
                name: "IX_PolicyProposals_BasePremiumPlanBasePremiumId",
                table: "PolicyProposals");

            migrationBuilder.DropColumn(
                name: "BasePremiumPlanBasePremiumId",
                table: "PolicyProposals");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyProposals_BasePremiumId",
                table: "PolicyProposals",
                column: "BasePremiumId");

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyProposals_BasePremiumPlans_BasePremiumId",
                table: "PolicyProposals",
                column: "BasePremiumId",
                principalTable: "BasePremiumPlans",
                principalColumn: "BasePremiumId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PolicyProposals_BasePremiumPlans_BasePremiumId",
                table: "PolicyProposals");

            migrationBuilder.DropIndex(
                name: "IX_PolicyProposals_BasePremiumId",
                table: "PolicyProposals");

            migrationBuilder.AddColumn<int>(
                name: "BasePremiumPlanBasePremiumId",
                table: "PolicyProposals",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PolicyProposals_BasePremiumPlanBasePremiumId",
                table: "PolicyProposals",
                column: "BasePremiumPlanBasePremiumId");

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyProposals_BasePremiumPlans_BasePremiumPlanBasePremiumId",
                table: "PolicyProposals",
                column: "BasePremiumPlanBasePremiumId",
                principalTable: "BasePremiumPlans",
                principalColumn: "BasePremiumId");
        }
    }
}
