using Microsoft.AspNetCore.Mvc;
using Solveit.Api.Core.Application.Features.Commands.Categories;
using Solveit.Api.Core.Application.Features.Queries.Categories;

namespace Solveit.Api.Presentation.Controllers
{
    public class CategoriesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return HandleResponse(await Mediator.Send(new GetCategoriesRequestQuery()));
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoriesWithSubcategories()
        {
            return HandleResponse(await Mediator.Send(new GetCategoriesWithSubcategoriesRequestQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubcategoriesByCategoryId([FromRoute] GetSubcategoriesByCategoryIdRequestQuery query)
        {
            return HandleResponse(await Mediator.Send(query));
        }

        [HttpPost]
        public async Task<IActionResult> UploadCategoryImage([FromForm] UploadCategoryImageRequestCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpPost]
        public async Task<IActionResult> UploadSubcategoryImage([FromForm] UploadSubcategoryImageRequestCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}
