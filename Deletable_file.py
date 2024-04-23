from tkinter import *
from tkinter import messagebox

# In-memory user records list
user_records = []

def open_login_page():
    login_window = Toplevel(root)
    login_window.title("Login")
    login_window.geometry("900x900")

    label_login_title = Label(login_window, text="Login", font=("Helvetica", 20))
    label_login_title.grid(row=0, column=0, columnspan=2, pady=10)

    label_login_email = Label(login_window, text="Email:")
    label_login_email.grid(row=1, column=0, pady=5)
    entry_login_email = Entry(login_window)
    entry_login_email.grid(row=1, column=1, pady=5)

    label_login_password = Label(login_window, text="Password:")
    label_login_password.grid(row=2, column=0, pady=5)
    entry_login_password = Entry(login_window, show="*")
    entry_login_password.grid(row=2, column=1, pady=5)

    def authenticate_user():
        # Add authentication logic here
        email = entry_login_email.get()
        password = entry_login_password.get()

        # You need to add your authentication logic here
        # Compare entered email and password with your stored data, or use the in-memory user_records list

        # For demonstration purposes, let's show a message box indicating successful login
        messagebox.showinfo("Success", "Login successful")

        # Close the login window after successful login
        login_window.destroy()

    btn_login = Button(login_window, text="Login", command=authenticate_user)
    btn_login.grid(row=3, column=0, columnspan=2, pady=10)


def open_registration_page():
    registration_window = Toplevel(root)
    registration_window.title("Registration")
    registration_window.geometry("900x900")

    # Registration variables
    reg_name = StringVar()
    reg_mobile = StringVar()
    reg_address = StringVar()
    reg_email = StringVar()
    reg_gender = StringVar()
    reg_password = StringVar()

    # Registration Page
    label_reg_title = Label(registration_window, text="Registration", font=("Helvetica", 20))
    label_reg_title.grid(row=0, column=0, columnspan=2, pady=10)

    label_reg_name = Label(registration_window, text="Name:")
    label_reg_name.grid(row=1, column=0, pady=5)
    entry_reg_name = Entry(registration_window, textvariable=reg_name)
    entry_reg_name.grid(row=1, column=1, pady=5)

    label_reg_mobile = Label(registration_window, text="Mobile No:")
    label_reg_mobile.grid(row=2, column=0, pady=5)
    entry_reg_mobile = Entry(registration_window, textvariable=reg_mobile)
    entry_reg_mobile.grid(row=2, column=1, pady=5)

    label_reg_address = Label(registration_window, text="Address:")
    label_reg_address.grid(row=3, column=0, pady=5)
    entry_reg_address = Entry(registration_window, textvariable=reg_address)
    entry_reg_address.grid(row=3, column=1, pady=5)

    label_reg_email = Label(registration_window, text="Email:")
    label_reg_email.grid(row=4, column=0, pady=5)
    entry_reg_email = Entry(registration_window, textvariable=reg_email)
    entry_reg_email.grid(row=4, column=1, pady=5)

    label_reg_gender = Label(registration_window, text="Gender:")
    label_reg_gender.grid(row=5, column=0, pady=5)
    radio_male = Radiobutton(registration_window, text="Male", variable=reg_gender, value="Male")
    radio_female = Radiobutton(registration_window, text="Female", variable=reg_gender, value="Female")
    radio_other = Radiobutton(registration_window, text="Other", variable=reg_gender, value="Other")
    radio_male.grid(row=5, column=1, pady=5)
    radio_female.grid(row=6, column=1, pady=5)
    radio_other.grid(row=7, column=1, pady=5)

    label_reg_password = Label(registration_window, text="Password:")
    label_reg_password.grid(row=8, column=0, pady=5)
    entry_reg_password = Entry(registration_window, show="*", textvariable=reg_password)
    entry_reg_password.grid(row=8, column=1, pady=5)

    def insert_record():
        # Insert data into the in-memory list
        user_records.append({
            "name": reg_name.get(),
            "mobile": reg_mobile.get(),
            "address": reg_address.get(),
            "email": reg_email.get(),
            "gender": reg_gender.get(),
            "password": reg_password.get()
        })
        messagebox.showinfo("Success", "Registration successful")

        # Close registration window after successful registration
        registration_window.destroy()

    def reset_registration_fields():
        reg_name.set("")
        reg_mobile.set("")
        reg_address.set("")
        reg_email.set("")
        reg_gender.set("")
        reg_password.set("")

    btn_insert = Button(registration_window, text="Insert", command=insert_record)
    btn_insert.grid(row=10, column=0, pady=10)

    btn_reset_reg = Button(registration_window, text="Reset", command=reset_registration_fields)
    btn_reset_reg.grid(row=10, column=1, pady=10)

# GUI setup
root = Tk()
root.title("Student Record System")
root.geometry("500x400")

label_home_title = Label(root, text="Home", font=("Helvetica", 20))
label_home_title.pack(pady=20)

btn_login = Button(root, text="Login", command=open_login_page)
btn_login.pack(pady=10)

btn_register = Button(root, text="Register", command=open_registration_page)
btn_register.pack(pady=10)

root.mainloop()
  
