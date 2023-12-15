from fastapi import FastAPI
import uvicorn
from typing import Dict, Any

app = FastAPI()

# recommend use pprint to clarify the print
def pprint(ctx):
    return f'[python] {ctx}'

@app.get("/")
def get_test():
    return {"Hello": "World"}

# you can add python function into it 
@app.post("/")
def main(payload: Dict[Any, Any]): 
    print("[python]", payload)
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5600)