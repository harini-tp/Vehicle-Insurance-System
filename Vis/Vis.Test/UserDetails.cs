using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using Vis.Data;
using Vis.DTOs;
using Vis.Model;
using Vis.Repository.Implementations;


namespace Vis.Test
{
    internal class UserDetails
    {
        [TestFixture]
        public class ViewVehicleTests
        {
            private Mock<DbSet<User>> _mockSet;
            private Mock<VisDbContext> _mockContext;
            private ClientServiceImpl _service;

            [SetUp]
            public void Setup()
            {
                _mockSet = new Mock<DbSet<User>>();

                _mockContext = new Mock<VisDbContext>();
                _mockContext.Setup(m => m.Users).Returns(_mockSet.Object);

                _service = new ClientServiceImpl(_mockContext.Object); 
            }

            [Test]
            public void RegisterClient_ShouldAddUserAndSaveChanges()
            {
                var dto = new UserRegisterDTO
                {
                    FullName = "John Doe",
                    Address = "123 Main St",
                    DateOfBirth = new DateOnly(1990, 1, 1),
                    AadhaarNumber = "123456789012",
                    PANNumber = "ABCDE1234F",
                    PhoneNumber = "9876543210",
                    Email = "john@example.com",
                    Password = "password123"
                };

                _service.RegisterClient(dto);

                _mockSet.Verify(m => m.Add(It.Is<User>(u =>
                    u.FullName == dto.FullName &&
                    u.Address == dto.Address &&
                    u.DateOfBirth == dto.DateOfBirth &&
                    u.AadhaarNumber == dto.AadhaarNumber &&
                    u.PANNumber == dto.PANNumber &&
                    u.PhoneNumber == dto.PhoneNumber &&
                    u.Email == dto.Email &&
                    u.Password == dto.Password &&
                    u.Role == "Client"
                )), Times.Once);

                _mockContext.Verify(m => m.SaveChanges(), Times.Once);
            }
        }
    }
}
