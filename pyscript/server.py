from fastapi import FastAPI
import uvicorn
from typing import Dict, Any

app = FastAPI()

@app.get("/")
def get_test():
    return {"Hello": "World"}

# you can add python like
@app.post("/")
def main(payload: Dict[Any, Any]): 
    print("[python]", payload)
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5600)