# Подключение

Надо вставить компонент на страницу.

```tsx
<ContactFormPlus
    title="Контактная форма"
    fields={serializedFields}
    storageKey="myCustomFormData"
/>
```

над return вставить

```tsx
const serializedFields = JSON.parse(JSON.stringify(deliveryForm));
```

deliveryForm - для примера. Это данные из папки data, из файла data => delivery-form.ts

API находится в api - formOptions

Надо помнить, что если меняешь поля в delivery-form.ts