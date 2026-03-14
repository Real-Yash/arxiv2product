import asyncio
from agentica import spawn

async def main():
    agent = await spawn(premise="Hi", model="anthropic/claude-sonnet-4")
    print("Testing stream...")
    try:
        async for chunk in agent.stream(str, "Count to 5."):
            print(f"Chunk: {chunk}", end="", flush=True)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await agent.close()
        print("\nDone!")

if __name__ == "__main__":
    asyncio.run(main())
