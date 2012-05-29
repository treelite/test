from Tkinter import *
from tkFont import *


class App(Frame):
    def createWidgets(self):

        # set global font
        textFont = Font(size=10)
        # set global grid
        self.grid_configure(padx=5, pady=5, sticky = 'w') #不设置会有问题 Orz...

        Label(self, text="Title:").grid(row=0, padx=5, pady=5, sticky = 'w')
        Label(self, text="Desction:").grid(row=1, padx=5, pady=5, sticky = 'wN')

        self.e1 = Entry(self, width=50, font=textFont)
        self.e2 = Text(self, height=10, width=50, font=textFont)

        self.e1.grid(row=0, column=1)
        self.e2.grid(row=1, column=1)

        self.typeValue = StringVar() #参数设置 各种奇怪
        self.typeValue.set('pre')

        TYPE_MODE = [('pre-commit review', 'pre'), ('post-commit review', 'post')]
        radioArea = Frame(self)
        radioArea.grid(row = 2, columnspan = 2, sticky = 'w')
        for text, val in TYPE_MODE:
            Radiobutton(radioArea, text=text, value=val, variable=self.typeValue).pack(side = 'left')

        buttonArea = Frame(self)
        buttonArea.grid(row = 3, columnspan = 2, sticky = 'w')
        
        self.btnOK = Button(buttonArea, text = "Submit", command = self.okHandler)
        self.btnOK.pack(side = 'left')
        self.cancel = Button(buttonArea, text = "cancel", command = self.quit)
        self.cancel.pack(side = 'left', padx = 20)

    def okHandler(self):
        data = []
        data.append(self.e1.get())
        data.append(self.e2.get(1.0, END)) #这个函数太奇怪了....
        data.append(self.typeValue.get())
        print(data)

    def __init__(self, master=None):
        Frame.__init__(self, master)
        self.pack()
        self.createWidgets()

if __name__ == '__main__':
    root = Tk()
    app = App(root)
    app.master.title('Cooder')
    app.mainloop()
    root.destroy()
