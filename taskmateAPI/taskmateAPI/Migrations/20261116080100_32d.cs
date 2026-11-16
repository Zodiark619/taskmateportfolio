using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace taskmateAPI.Migrations
{
    /// <inheritdoc />
    public partial class _32d : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParkingSlot",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Area = table.Column<string>(type: "text", nullable: false),
                    SlotNumber = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingSlot", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ParkingOrder",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ParkingSlotId = table.Column<int>(type: "integer", nullable: false),
                    CarNumber = table.Column<string>(type: "text", nullable: false),
                    Action = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingOrder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParkingOrder_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParkingOrder_ParkingSlot_ParkingSlotId",
                        column: x => x.ParkingSlotId,
                        principalTable: "ParkingSlot",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ParkingSlot",
                columns: new[] { "Id", "Area", "SlotNumber", "Status" },
                values: new object[,]
                {
                    { 1, "A", "A1", "Available" },
                    { 2, "A", "A2", "Available" },
                    { 3, "B", "B1", "Available" },
                    { 4, "B", "B2", "Available" },
                    { 5, "C", "C1", "Available" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ParkingOrder_ParkingSlotId",
                table: "ParkingOrder",
                column: "ParkingSlotId");

            migrationBuilder.CreateIndex(
                name: "IX_ParkingOrder_UserId",
                table: "ParkingOrder",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ParkingOrder");

            migrationBuilder.DropTable(
                name: "ParkingSlot");
        }
    }
}
