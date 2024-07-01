from tkinter import *
from tkinter import ttk, filedialog, messagebox
from pypdf import PdfWriter


def select_file():
    f_list.clear()
    tv.delete(*tv.get_children())
    files = filedialog.askopenfilenames()
    if files == "":
        messagebox.showwarning("경고", "파일을 추가 하세요")
    else:
        # messagebox.showinfo("안내", files[0])
        # messagebox.showinfo("안내", files[1])
        for i in range(len(files)):
            temp_name = files[i][files[i].rfind("/") + 1:len(files[i])]
            f_list.append({"path": files[i], "filename": temp_name.replace(" ", "_")})
            # print(f_list[i].get("path"))
            # print(f_list[i].get("path").rfind("/"))
            # print(len(f_list[i].get("path")))
            # print(f_list[i].get("ath")[f_list[i].get("path").rfind("/")+1:])
            tv.insert("", "end", text=str(i + 1), values=f_list[i].get("filename"))
        # print(f_list)


def merge_pdf():
    print(f_list)
    for pdf in f_list:
        # print('kowaine', pdf.get("path"))
        merger.append(pdf.get("path"))

    merger.write("merged-pdf.pdf")
    merger.close()
    messagebox.showwarning("알림", "병합이 완료되었습니다.")


# from pypdf import PdfWriter
#
# merger = PdfWriter()
#
# for pdf in ["아폴로 TDE 토큰 문서(5.24).pdf", "앱수동설치가이드.pdf"]:
#     merger.append(pdf)
#
# merger.write("merged-pdf.pdf")
# merger.close()


merger = PdfWriter()
root = Tk()
f_list = []
frm = ttk.Frame(root, padding=10)
frm.grid()
# ttk.Label(frm, text="select files").grid(column=0, row=0)
ttk.Button(frm, text="find...", command=select_file).grid(column=0, row=0)
ttk.Button(frm, text="reset...", command=root.destroy).grid(column=1, row=0)
ttk.Button(frm, text="merge!", command=merge_pdf).grid(column=2, row=0)
frm2 = ttk.Frame(root, padding=10)
frm2.grid()
tv = ttk.Treeview(frm2, columns=["filename"], displaycolumns=["filename"])
tv.grid(column=0, row=0)

root.mainloop()
