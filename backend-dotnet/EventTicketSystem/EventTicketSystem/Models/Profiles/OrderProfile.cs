using AutoMapper;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.Entities;
using EventTicketSystem.Models.RequestBodies;

namespace EventTicketSystem.Models.AutoMappers
{
    public class OrderProfile : Profile
    {
        public OrderProfile() 
        {
            CreateMap<Order, OrderDTO>()
               .ForMember(orderDTO => orderDTO.OrderId,
                    opt => opt.MapFrom(order => order.OrderId))
               .ForMember(orderDTO => orderDTO.EventId, 
                    opt => opt.MapFrom(order => order.TicketCategory.Event.EventId))
               .ForMember(orderDTO => orderDTO.OrderedAt, 
                    opt => opt.MapFrom(order => order.OrderedAt))
               .ForMember(orderDTO => orderDTO.TicketCategoryId, 
                    opt => opt.MapFrom(order => order.TicketCategoryId))
               .ForMember(orderDTO => orderDTO.NumberOfTickets, 
                    opt => opt.MapFrom(order => order.NumberOfTickets))
               .ForMember(orderDTO => orderDTO.TotalPrice, 
                    opt => opt.MapFrom(order => order.TotalPrice));

            CreateMap<OrderAddRequestBodyDTO, Order>()
                .ForMember(order => order.TicketCategoryId, 
                    opt => opt.MapFrom(orderAddRequestBodyDTO  => orderAddRequestBodyDTO.TicketCategoryId))
                .ForMember(order => order.NumberOfTickets, 
                    opt => opt.MapFrom(orderAddRequestBodyDTO => orderAddRequestBodyDTO.NumberOfTickets))
                .AfterMap((orderRequestBody, order) =>
                {
                    order.OrderedAt = DateTime.Now;
                });

            CreateMap<OrderUpdateRequestBodyDTO, Order>()
                .ForMember(order => order.TicketCategoryId,
                    opt => opt.MapFrom(orderUpdateRequestBodyDTO => orderUpdateRequestBodyDTO.TicketCategoryId))
                .ForMember(order => order.NumberOfTickets,
                    opt => opt.MapFrom(orderUpdateRequestBodyDTO => orderUpdateRequestBodyDTO.NumberOfTickets));
        }
    }
}
