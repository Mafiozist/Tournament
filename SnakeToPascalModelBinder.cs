using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Reflection;

namespace Tournament
{
    public class SnakeToPascalModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext is null) throw new ArgumentException(nameof(bindingContext));

            //Получаем имя параметра привязки
            var snakeParam = bindingContext.FieldName;

            //Проверяем что модель является классом
            if (!bindingContext.ModelType.IsClass)
            {
                bindingContext.Result = ModelBindingResult.Failed();
                return Task.CompletedTask;
            }

            //Создаем экземпляр класса модели
            var model = Activator.CreateInstance(bindingContext.ModelType);
            var markedProperties = bindingContext.ModelType.GetProperties(BindingFlags.Public | BindingFlags.Instance).Where(f => f.GetCustomAttribute<SnakeToPascalModelBinderAttribute>() != null);

            foreach(var field in markedProperties)
            {
                //Преобразуем snake_case to Pascal
                var pascalCase = ToPascal(field.Name);

                //Получаем значение из контекст
                var val = bindingContext.ValueProvider.GetValue(pascalCase);

                //Привязываем значения к pascal
                if (val != ValueProviderResult.None)
                {
                    field.SetValue(model, Convert.ChangeType(val.FirstValue, field.PropertyType));
                }

            }

            var markedFields = bindingContext.ModelType.GetFields(BindingFlags.Public | BindingFlags.Instance).Where(f => f.GetCustomAttribute<SnakeToPascalModelBinderAttribute>() != null);

            foreach (var field in markedFields)
            {
                //Преобразуем snake_case to Pascal
                var pascalCase = ToPascal(field.Name);

                //Получаем значение из контекст
                var val = bindingContext.ValueProvider.GetValue(pascalCase);

                //Привязываем значения к pascal
                if (val != ValueProviderResult.None)
                {
                    field.SetValue(model, Convert.ChangeType(val.FirstValue, field.FieldType));
                }
            }

            bindingContext.Result = ModelBindingResult.Success(model);
            return Task.CompletedTask;
        }

        private string ToPascal(string name)
        {
            if (String.IsNullOrEmpty(name)) return name;
            var listOfWords = name.Split("_");

            if (listOfWords.Length < 2) return String.Join("", listOfWords);

            for (int i = 0; i < listOfWords.Length; i++)
            {
                listOfWords[i] = char.ToUpperInvariant(listOfWords[i][0]) + listOfWords[i].Substring(1);
            }

            return String.Join("",listOfWords);
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Parameter | AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public class SnakeToPascalModelBinderAttribute : Attribute { }

    public class SnakeToPascalModelBinderProvider : IModelBinderProvider
    {
        public IModelBinder? GetBinder(ModelBinderProviderContext context)
        {
            if (context is null) throw new ArgumentException(nameof(context));

            if(context.Metadata.ModelType.GetCustomAttributes(typeof(SnakeToPascalModelBinderAttribute), true).Length > 0)
            {
                return new SnakeToPascalModelBinder();
            }

            return null;
        }
    }
}
