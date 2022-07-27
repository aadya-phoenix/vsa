using AutoMapper;
using MarutiSuzuki.Audit.Entity.Model;
using MarutiSuzuki.Audit.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarutiSuzuki.API
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			// Add as many of these lines as you need to map your objects			
			//CreateMap<UserDto, User>();
		}
	}
}
