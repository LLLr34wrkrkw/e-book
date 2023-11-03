from cx_Freeze import setup, Executable

base = None    

executables = [Executable("convert.py", base=base)]

packages = ["idna"]
options = {
    'build_exe': {    
        'packages':packages,
    },    
}

setup(
    name = "SetupForConverter",
    options = options,
    version = "3",
    description = 'Setup',
    executables = executables
)