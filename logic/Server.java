package logic;

public class Server {
	
	public static char[][] test_board = 
			{{'#','#','#','#','#','#','#','#','#','#'},
			 {'#',' ','B',' ','B',' ','B',' ','B','#'},
			 {'#','B',' ','B',' ','B',' ','B',' ','#'},
			 {'#',' ','B',' ','B',' ','B',' ','B','#'},
			 {'#','b',' ',' ',' ',' ',' ',' ',' ','#'},
			 {'#',' ',' ',' ',' ',' ',' ',' ',' ','#'},
			 {'#','W',' ',' ',' ','W',' ','W',' ','#'},
			 {'#',' ','W',' ','W',' ','W',' ','W','#'},
			 {'#','W',' ','W',' ','W',' ','W',' ','#'},
			 {'#','#','#','#','#','#','#','#','#','#'}
			};
	
	// Position to Integer array
	public static int[] convertPositions(String pos)
	{
		String[] split_pos = pos.split(" ");
		int res[] = new int[2];
		
		for(int i=0; i<split_pos.length; i++)
		{
			res[i] = Integer.parseInt(split_pos[i]);
		}
		
		return res;
	}
	
	// Converts char[][] to String
	private static String boardToString(char[][] board)
	{
		String res="";
		for(int i=0; i<board.length; i++)
		{
			if(i!=0)
			{
				res+="\r\n";
			}
			for(int j=0; j<board[i].length; j++)
			{
				res+=String.valueOf(board[i][j]);
			}
		}
		
		return res;
	}
	
	// Valid move check
	public static String checkMove(char[][] board_to_check, String curr_pos, String des_pos)
	{
		String res="";
		
		int curr_pos_x = convertPositions(curr_pos)[0];
		int curr_pos_y = convertPositions(curr_pos)[1];
		
		int des_pos_x = convertPositions(des_pos)[0];
		int des_pos_y = convertPositions(des_pos)[1];
		
		
		// Board limits check
		if((des_pos_x > 0) && (des_pos_x < 9) && (curr_pos_x > 0) && (curr_pos_x < 9))
		{
			if((des_pos_y > 0) && (des_pos_y < 9) && (curr_pos_y > 0) && (curr_pos_y < 9))
			{
				// Current piece checks
				char curr_pos_char = board_to_check[curr_pos_y][curr_pos_x];
				char des_pos_char = board_to_check[des_pos_y][des_pos_x];
				
				switch(curr_pos_char)
				{
					case 'W':
						if(des_pos_char == ' ')
						{
							if(des_pos_y == (curr_pos_y-1))
							{
								if((des_pos_x == curr_pos_x+1) || (des_pos_x == curr_pos_x-1))
								{
									board_to_check[curr_pos_y][curr_pos_x] = ' ';
									
									// Forms a white king 'w'
									if(des_pos_y == 1)
									{
										board_to_check[des_pos_y][des_pos_x] = 'w';
									}
									else // Regular move
									{
										board_to_check[des_pos_y][des_pos_x] = 'W';
									}
									
									res += boardToString(board_to_check);
									res += "\r\nVALID";

								}
							}
							else if(des_pos_y == (curr_pos_y-2))
							{
								if(des_pos_x == curr_pos_x+2)
								{
									if(board_to_check[curr_pos_y-1][curr_pos_x+1] == 'B' || board_to_check[curr_pos_y-1][curr_pos_x+1] == 'b')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[curr_pos_y-1][curr_pos_x+1] = ' ';
										
										if(des_pos_y == 1)
										{
											// Eating move + white king 'w'
											board_to_check[des_pos_y][des_pos_x] = 'w';
										}
										else
										{
											// Normal eating move
											board_to_check[des_pos_y][des_pos_x] = 'W';
										}
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
								else if(des_pos_x == curr_pos_x-2)
								{
									if(board_to_check[curr_pos_y-1][curr_pos_x-1] == 'B' || board_to_check[curr_pos_y-1][curr_pos_x-1] == 'b')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[curr_pos_y-1][curr_pos_x-1] = ' ';
										
										if(des_pos_y == 1)
										{
											// Eating move + white king 'w'
											board_to_check[des_pos_y][des_pos_x] = 'w';
										}
										else 
										{
											// Normal eating move
											board_to_check[des_pos_y][des_pos_x] = 'W';
										}
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
								
							}
						}
						break;
					case 'B':
						if(des_pos_char == ' ')
						{
							if(des_pos_y == (curr_pos_y+1))
							{
								if((des_pos_x == curr_pos_x+1) || (des_pos_x == curr_pos_x-1))
								{
									board_to_check[curr_pos_y][curr_pos_x] = ' ';
									
									if(des_pos_y == 8)
									{
										// Forms a black king 'b'
										board_to_check[des_pos_y][des_pos_x] = 'b';
									}
									else // Regular move
									{
										board_to_check[des_pos_y][des_pos_x] = 'B';
									}
									
									res += boardToString(board_to_check);
									res += "\r\nVALID";
								}
							}
							else if(des_pos_y == (curr_pos_y+2))
							{
								if(des_pos_x == curr_pos_x+2)
								{
									if(board_to_check[curr_pos_y+1][curr_pos_x+1] == 'W' || board_to_check[curr_pos_y+1][curr_pos_x+1] == 'w')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[curr_pos_y+1][curr_pos_x+1] = ' ';
										
										if(des_pos_y == 8)
										{
											// Eating move + black king 'b'
											board_to_check[des_pos_y][des_pos_x] = 'b';
										}
										else
										{
											// Normal eating move																																														
											board_to_check[des_pos_y][des_pos_x] = 'B';
										}
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
								else if(des_pos_x == curr_pos_x-2)
								{
									if(board_to_check[curr_pos_y+1][curr_pos_x-1] == 'W' || board_to_check[curr_pos_y+1][curr_pos_x-1] == 'w')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[curr_pos_y+1][curr_pos_x-1] = ' ';
										
										if(des_pos_y == 8)
										{
											// Eating move + black king 'b'
											board_to_check[des_pos_y][des_pos_x] = 'b';
										}
										else
										{
											// Normal eating move
											board_to_check[des_pos_y][des_pos_x] = 'B';
										}
										
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
							}
						}
						break;
					case 'w':
						if(des_pos_char == ' ')
						{
							if(des_pos_y == curr_pos_y-1)
							{
								if((des_pos_x == curr_pos_x+1) || (des_pos_x == curr_pos_x-1))
								{
									board_to_check[curr_pos_y][curr_pos_x] = ' ';
									board_to_check[des_pos_y][des_pos_x] = 'w';
									
									res += boardToString(board_to_check);
									res += "\r\nVALID";
								}
							
							}
							else if(des_pos_y == curr_pos_y+1)
							{
								if((des_pos_x == curr_pos_x+1) || (des_pos_x == curr_pos_x-1))
								{
									board_to_check[curr_pos_y][curr_pos_x] = ' ';
									board_to_check[des_pos_y][des_pos_x] = 'w';
									
									res += boardToString(board_to_check);
									res += "\r\nVALID";
								}
								
							}
							else if(des_pos_y == curr_pos_y-2)
							{
								if(des_pos_x == curr_pos_x-2)
								{
									if(board_to_check[curr_pos_y-1][curr_pos_x-1] == 'B' || board_to_check[curr_pos_y-1][curr_pos_x-1] == 'b')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[des_pos_y][des_pos_x] = 'w';
										board_to_check[curr_pos_y-1][curr_pos_x-1] = ' ';
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
								else if(des_pos_x == curr_pos_x+2)
								{
									if(board_to_check[curr_pos_y-1][curr_pos_x+1] == 'B' || board_to_check[curr_pos_y-1][curr_pos_x+1] == 'b')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[des_pos_y][des_pos_x] = 'w';
										board_to_check[curr_pos_y-1][curr_pos_x+1] = ' ';
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
							}
							else if(des_pos_y == curr_pos_y+2)
							{
								if(des_pos_x == curr_pos_x-2)
								{
									if(board_to_check[curr_pos_y+1][curr_pos_x-1] == 'B' || board_to_check[curr_pos_y+1][curr_pos_x-1] == 'b')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[des_pos_y][des_pos_x] = 'w';
										board_to_check[curr_pos_y+1][curr_pos_x-1] = ' ';
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
								else if(des_pos_x == curr_pos_x+2)
								{									
									if(board_to_check[curr_pos_y+1][curr_pos_x+1] == 'B' || board_to_check[curr_pos_y+1][curr_pos_x+1] == 'b')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[des_pos_y][des_pos_x] = 'w';
										board_to_check[curr_pos_y+1][curr_pos_x+1] = ' ';
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
									
								}
							}
						}
						break;
					case 'b':
						if(des_pos_char == ' ')
						{
							if(des_pos_y == curr_pos_y-1)
							{
								if((des_pos_x == curr_pos_x+1) || (des_pos_x == curr_pos_x-1))
								{
									board_to_check[curr_pos_y][curr_pos_x] = ' ';
									board_to_check[des_pos_y][des_pos_x] = 'b';
									
									res += boardToString(board_to_check);
									res += "\r\nVALID";
								}
							
							}
							else if(des_pos_y == curr_pos_y+1)
							{
								if((des_pos_x == curr_pos_x+1) || (des_pos_x == curr_pos_x-1))
								{
									board_to_check[curr_pos_y][curr_pos_x] = ' ';
									board_to_check[des_pos_y][des_pos_x] = 'b';
									
									res += boardToString(board_to_check);
									res += "\r\nVALID";
								}
								
							}
							else if(des_pos_y == curr_pos_y-2)
							{
								if(des_pos_x == curr_pos_x-2)
								{
									if(board_to_check[curr_pos_y-1][curr_pos_x-1] == 'W' || board_to_check[curr_pos_y-1][curr_pos_x-1] == 'w')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[des_pos_y][des_pos_x] = 'b';
										board_to_check[curr_pos_y-1][curr_pos_x-1] = ' ';
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
								else if(des_pos_x == curr_pos_x+2)
								{
									if(board_to_check[curr_pos_y-1][curr_pos_x+1] == 'W' || board_to_check[curr_pos_y-1][curr_pos_x+1] == 'w')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[des_pos_y][des_pos_x] = 'b';
										board_to_check[curr_pos_y-1][curr_pos_x+1] = ' ';
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
							}
							else if(des_pos_y == curr_pos_y+2)
							{
								if(des_pos_x == curr_pos_x-2)
								{
									if(board_to_check[curr_pos_y+1][curr_pos_x-1] == 'W' || board_to_check[curr_pos_y+1][curr_pos_x-1] == 'w')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[des_pos_y][des_pos_x] = 'b';
										board_to_check[curr_pos_y+1][curr_pos_x-1] = ' ';
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
								}
								else if(des_pos_x == curr_pos_x+2)
								{									
									if(board_to_check[curr_pos_y+1][curr_pos_x+1] == 'W' || board_to_check[curr_pos_y+1][curr_pos_x+1] == 'w')
									{
										board_to_check[curr_pos_y][curr_pos_x] = ' ';
										board_to_check[des_pos_y][des_pos_x] = 'b';
										board_to_check[curr_pos_y+1][curr_pos_x+1] = ' ';
										
										res += boardToString(board_to_check);
										res += "\r\nVALID";
									}
									
								}
							}
						}
						break;
					default:
						res+=boardToString(board_to_check);
						res+="\r\nINVALID";
						break;
				}
			}
		}
		
		if(res == "")
		{
			res += boardToString(board_to_check);
			res += "\r\nINVALID";
		}
		
		return res;
		
	}

	public static void main(String[] args)
	{	String initial_test_board = boardToString(test_board);
		System.out.println(initial_test_board+"\r\n");
		
		String test = checkMove(test_board, "1 4", "2 5");
		
		System.out.print(test);
	}

}
