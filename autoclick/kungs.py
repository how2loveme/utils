import pyautogui
import threading

def awake_mydesk():
	
	screenWidth, screenHeight = pyautogui.size() # Get the size of the primary monitor.
	print(screenWidth, screenHeight)
	
	currentMouseX, currentMouseY = pyautogui.position() # Get the XY position of the mouse.
	print(currentMouseX, currentMouseY)
	
	pyautogui.moveTo(3195, 110) # Move to Dock Area
	pyautogui.click()          # Click the mouse.
	pyautogui.moveTo(3195, 150, duration=0.2, tween=pyautogui.easeInOutQuad)  # Use tweening/easing function to move mouse over 0.2 seconds.
	pyautogui.moveTo(currentMouseX, currentMouseY) # Move to Origin Area

	threading.Timer(1700, awake_mydesk).start()

awake_mydesk()