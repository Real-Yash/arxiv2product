import asyncio
import inspect
from agentica import spawn

async def main():
    agent = await spawn(premise="Hi", model="anthropic/claude-sonnet-4")
    print("Methods:", [m for m in dir(agent) if not m.startswith('_')])
    if hasattr(agent, "stream"):
        print("Has stream!")
        
    print("Agent type:", type(agent))
    
    # Try interacting with the agent
    print("Calling agent...")
    res = await agent.call(str, "Hello!")
    print("Response:", res)
    await agent.close()

if __name__ == "__main__":
    asyncio.run(main())
