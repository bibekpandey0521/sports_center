# 🏀 Sports Center Management System

This project is a backend REST API system for managing a sports center's products, built using **Spring Boot** and **MySQL**. It includes features for managing Brands, Product Types, and Products.

## 📂 Tech Stack
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Lombok
- ModelMapper
- Hibernate Validator

---

## 📌 Features Implemented

### ✅ Brands Module
- Create, update, delete, list brands
- DTO pattern used with validation

### ✅ Product Types Module
- Linked with brands (One-to-Many relationship)
- Modular and reusable controller/service structure

### ✅ Products Module
- Contains details like name, description, price, brand & type
- Uses Many-to-One relationships
- Image URL support (can be integrated with actual image storage in future)

---

## 📘 What I Learned

- ✅ Spring Boot RESTful API development
- ✅ DTO pattern and use of **ModelMapper**
- ✅ Validation using **Hibernate Validator**
- ✅ Exception handling with `@ControllerAdvice`
- ✅ Pagination and Sorting using `Pageable` and `@RequestParam`
- ✅ Database normalization and relationship mapping

---

## 🧪 Sample API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | List all products with pagination & sorting |
| `POST` | `/brands` | Add a new brand |
| `POST` | `/types` | Add new product type |
| `POST` | `/products` | Create a product |
| ... | ... | Full API reference available in code |

---

## 🚧 Next Step

🔜 Integrating **React** for frontend development to display and manage the system through a user-friendly interface.

---

## 📎 Author

**Bibek Pandey**  
📫 [LinkedIn](https://www.linkedin.com/in/bibek-pandey-39216b341/)  
📁 [GitHub](https://github.com/bibekpandey0521)

---

> Feel free to fork, clone, and contribute. Open to feedback and collaboration!
