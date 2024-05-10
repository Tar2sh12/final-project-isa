using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Repository.Contract;
using VAXSchedular.InfraStructure.Data;

namespace VAXSchedular.InfraStructure
{
	

		public class GenericRepository<T> : IGenericRepository<T> where T : class
		{
			private readonly ApplicationDbContext _dbContext;

			public GenericRepository(ApplicationDbContext dbContext)
			{
				_dbContext = dbContext;
			}

			public async Task Add(T entity)
			{
				await _dbContext.Set<T>().AddAsync(entity);
				_dbContext.SaveChanges();
			}

			public async Task Delete(T entity)
			{
				_dbContext.Set<T>().Remove(entity);
				await _dbContext.SaveChangesAsync();
			}

			public async Task<IEnumerable<T>> GetAll()
			{
				return await _dbContext.Set<T>().ToListAsync();

			}

			public async Task<T> Get(int id)
			{
				return await _dbContext.Set<T>().FindAsync(id);
			     
			}




		public async Task Update(T entity)
			{
				_dbContext.Set<T>().Update(entity);
				await _dbContext.SaveChangesAsync();
			}

	
	}
	}

