<?php
function getDb()
{
	 return pg_connect("host=ec2-34-202-65-210.compute-1.amazonaws.com
							              port=5432
										  dbname=d7afqsmdk0k7j8
										  user=aqbjmsnsdmqdpi
										  password=5a992262f615ca9c609a5f865251123bd39fc4507dbdde7e7f6251206c66b6a1
										  ") or die("Connection fail");
}
?>